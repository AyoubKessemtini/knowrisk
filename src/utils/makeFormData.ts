import mime from 'mime';

interface MakeFormData {
  uri: string;
}

export const makeAssetFormData = ({ uri }: MakeFormData) => {
  const assetUri = 'file:///' + uri.split('file:/').join('');

  const formData = new FormData();
  formData.append('file', {
    uri: assetUri,
    name: assetUri.split('/').pop(),
    type: mime.getType(assetUri),
  });

  return formData;
};
