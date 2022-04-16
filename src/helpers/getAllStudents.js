const axios = require("axios");
const fs = require("fs");
const {
  SCHOOL_URL,
  STUDENT_URL,
  API_URL_STUDENT_DETAIL,
} = require("../helpers/env");

module.exports = () => {
  return new Promise((resolve, reject) => {
    const filePath = `./public/students/all.json`;
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      resolve(JSON.parse(data));
    } else {
      axios
        .get(STUDENT_URL)
        .then(async (response) => {
          const rawStudents = response.data.data;
          await Promise.all(
            rawStudents.map(async (e, i) => {
              const id = e[2];
              const detail = await axios.get(`${API_URL_STUDENT_DETAIL}${id}`);
              return {
                nomorTes: detail.data[0][3][0][3],
                nama: detail.data[0][3][2][3],
                tempatLahir: detail.data[0][3][4][4],
                alamat: detail.data[0][3][5][3],
                jenisKelamin: detail.data[0][3][3][3],
              };
            })
          )
            .then((result) => {
              fs.writeFileSync(filePath, JSON.stringify(result));
              resolve(result);
            })
            .catch((err) => {
              console.log(err);
              reject({
                message: "Gagal saat meload detail siswa",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          reject({
            message: "Gagal saat meload data siswa",
          });
        });
    }
  });
};
