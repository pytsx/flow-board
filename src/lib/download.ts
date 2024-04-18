export function download(data: any, title: string) {
  if (!data) return null

  const jsonData = JSON.stringify(data)
  const blob = new Blob([jsonData], { type: "application/json" })
  const downloadURL = URL.createObjectURL(blob)

  const downloadLink = document.createElement("a")
  downloadLink.href = downloadURL;
  downloadLink.download = `${title}.json`;
  downloadLink.click();

  // Limpar a URL de download após o download
  URL.revokeObjectURL(downloadURL);
}
