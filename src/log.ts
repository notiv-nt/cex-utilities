const element = document.createElement('div');

element.style = `
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 0.5rem;
  background-color: #fff;
  z-index: 999999;
  white-space: break-spaces;
  font-family: "Source Code Pro";
`;

document.body.appendChild(element);

export function log(any: any) {
  element.innerHTML = JSON.stringify(any, null, 4);
}
