const fs = require("fs");

const getAge = () => {
  const birthDate = new Date(1994, 0, 28);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  return today.getMonth() >= birthDate.getMonth() &&
    today.getDate() >= birthDate.getDate()
    ? age
    : --age;
};

fs.readFile("README_base.md", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }

  const replaceVars = {
    age: getAge(),
    company: "TOVTVS SA", // TODO: Automatizar com a LinkeIn API
    companyPage: "https://www.totvs.com/"
  };

  const updatedReadMe = data.replace(
    /%{.*}/gm,
    (e) => replaceVars?.[e.slice(2, -1)] || e
  );

  fs.writeFile("README.md", updatedReadMe, "utf-8", (err) => {
    if (err) {
      throw err;
    }
    console.log("✔ Finished!");
  });
});