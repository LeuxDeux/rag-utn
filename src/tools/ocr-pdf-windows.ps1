# OCR de los PDF escaneados (sin capa de texto) con el OCR que trae Windows 10/11.
#
# Uso (desde la raíz del repo, en Windows PowerShell 5.1):
#   powershell -NoProfile -ExecutionPolicy Bypass -File src/tools/ocr-pdf-windows.ps1
#   npm run import:pdf      # vuelve a convertir: ahora usa el OCR de los escaneados
#
# Lee corpus/pdf/_import.json, toma los descartados por «poco texto» que ya están bajados en
# data/pdf-cache/, renderiza cada página (Windows.Data.Pdf) y la pasa por Windows.Media.Ocr en
# español. Escribe corpus/pdf-ocr/<doc_id>.txt (páginas separadas por un salto de página \f).
# El .txt queda en git: import:pdf lo usa en cualquier sistema, y el OCR se corre una sola vez.
# Necesita el paquete de idioma español de Windows (Configuración > Hora e idioma > Idioma).
param([string[]]$Ids)
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime]

$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
} | Select-Object -First 1
$asTaskAccion = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction'
} | Select-Object -First 1
function Esperar($op, [Type]$tipo) {
  $t = $asTask.MakeGenericMethod($tipo).Invoke($null, @($op)); $null = $t.Wait(-1); $t.Result
}
function EsperarAccion($op) { $t = $asTaskAccion.Invoke($null, @($op)); $null = $t.Wait(-1) }

$motor = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new('es-ES'))
if (-not $motor) { throw 'No hay OCR en español: instalá el idioma español en Windows.' }

$raiz = (Get-Location).Path
if (-not $Ids) {
  $man = Get-Content -Raw -Encoding UTF8 (Join-Path $raiz 'corpus/pdf/_import.json') | ConvertFrom-Json
  $Ids = $man | Where-Object { $_.estado -eq 'descartado' -and $_.motivo -like 'poco texto*' -or $_.ocr } | ForEach-Object { $_.doc_id }
}
$salida = Join-Path $raiz 'corpus/pdf-ocr'
New-Item -ItemType Directory -Force $salida | Out-Null

foreach ($id in $Ids) {
  $pdfPath = Join-Path $raiz "data/pdf-cache/$id.pdf"
  if (-not (Test-Path $pdfPath)) { Write-Host "falta $pdfPath (correr antes npm run import:pdf)"; continue }
  $archivo = Esperar ([Windows.Storage.StorageFile]::GetFileFromPathAsync((Resolve-Path $pdfPath).Path)) ([Windows.Storage.StorageFile])
  $pdf = Esperar ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($archivo)) ([Windows.Data.Pdf.PdfDocument])
  $paginas = @()
  for ($i = 0; $i -lt $pdf.PageCount; $i++) {
    $pag = $pdf.GetPage($i)
    $op = [Windows.Data.Pdf.PdfPageRenderOptions]::new()
    $op.DestinationWidth = [uint32][Math]::Min(2400, $pag.Size.Width * 2.5)
    $flujo = [Windows.Storage.Streams.InMemoryRandomAccessStream]::new()
    EsperarAccion ($pag.RenderToStreamAsync($flujo, $op))
    $dec = Esperar ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($flujo)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bmp = Esperar ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $res = Esperar ($motor.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
    $paginas += (($res.Lines | ForEach-Object { $_.Text }) -join "`n")
    $bmp.Dispose(); $flujo.Dispose(); $pag.Dispose()
  }
  $texto = $paginas -join "`n`f`n"
  [System.IO.File]::WriteAllText((Join-Path $salida "$id.txt"), $texto + "`n", [System.Text.UTF8Encoding]::new($false))
  Write-Host ("{0,-60} {1} pág. {2} car." -f $id, $pdf.PageCount, $texto.Length)
}
