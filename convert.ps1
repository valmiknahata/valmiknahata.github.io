$ppt = New-Object -ComObject PowerPoint.Application
$presentation = $ppt.Presentations.Open("C:\Users\Valmi\.gemini\antigravity\scratch\valmiknahata.github.io\public\cv_supps\Poster Template.pptx")
$presentation.SaveAs("C:\Users\Valmi\.gemini\antigravity\scratch\valmiknahata.github.io\public\cv_supps\Poster Template.pdf", 32)
$presentation.Close()
$ppt.Quit()
