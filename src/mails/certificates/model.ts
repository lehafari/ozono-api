export const getContent = (firstName, lastName, title, certificateId) => {
  return `
<div
classname="container-border"
style="
  border: double 5px rgb(36, 147, 211);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  padding: 40px;
  width: 400px;
"
>
<div
  classname="container-text"
  style="
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
  "
>
  <h2 style="font-size: 30px;" >Certificado</h2>
  <p
    classname="text1"
    style="
      background-color: rgb(36, 147, 211);
      color: white;
      font-size: 18px;
      padding-inline: 50px;
    "
  >
    Este certificado certifica que
  </p>
  <h1 classnme="name">${firstName} ${lastName}</h1>
  <p classname="text2" style="width: 200px; font-size: 12px">
    Curso y aprobó satisfactoriamente el curso de: ${title}
  </p>
  <div
    classname="signature-date-container"
    style="
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-top: 20px;
    "
  >
    <div classname="date">
    <p classname="text-date" style="border-bottom: solid 1px #000000">
      27/02/2022
    </p>
  </div>
  <div classname="signature">
    <p classname="text-signature" style="border-bottom: solid 1px #000000" >Firma</p>
  </div>
  <div classname="signature">
    <p classname="text-signature" style="border-bottom: solid 1px #000000" >${certificateId}</p>
  </div>
</div>
</div>
`;
};
