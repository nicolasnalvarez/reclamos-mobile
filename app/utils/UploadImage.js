import * as firebase from "firebase";

export const uploadImage = async (uri, imageName, folder) => {
  return await fetch(uri)
    .then(async res => {
      const ref = firebase
        .storage()
        .ref()
        .child(`${folder}/${imageName}`);
      await ref.put(res._bodyBlob);

      return await firebase
        .storage()
        .ref(`${folder}/${imageName}`)
        .getDownloadURL()
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
