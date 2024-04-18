
export function upload(file: File, callback: (data: any) => void) {
  if (!file) return null
  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result as string);
    callback(data)
  };
  reader.readAsText(file);
}