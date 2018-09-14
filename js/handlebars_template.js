const sourceHTML = document.querySelector("#hbs-source").innerHTML;
const mainContainer = document.querySelector(".main-container");
const template = Handlebars.compile(sourceHTML);
const json = fetch('js/siteData.json')
  .then( resp => resp.json())
  .then( json => mainContainer.innerHTML = template(json))
  .then( () => init() ) //Load main site Javascript (portfilio.js)
  .then( () => loadCarousel() ) //Load carousel.js javascript

Handlebars.registerHelper('linkReplace', (originalText, url, textToReplace, replacementText = 'here') => {
  const link = `<a href="${url}">${replacementText}</a>`;
  return originalText.replace(textToReplace, url);
});