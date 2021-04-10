export const sendFile = (file: File, url: string): Promise<void> => {
  const promise = new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onload = () => {
      resolve();
    };

    xhr.upload.onerror = () => {
      reject();
    };
    xhr.upload.onabort = xhr.upload.onerror;
    xhr.upload.ontimeout = xhr.upload.onerror;

    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });

  return promise;
};
