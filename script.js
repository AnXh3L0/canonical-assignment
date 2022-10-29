function fetchData() {
  fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let itemsrow = '<div class="row u-equal-height">';
      data.forEach(function (item) {
        let date = new Date(`${item.date}`);
        let pubtime = date.getDate() + " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear();
        itemsrow += `
        <div class="col-4 p-card--highlighted">
          <header>
            <h5 class="p-muted-heading">${item._embedded["wp:term"][1][0].name}</h5>
          </header>
            <div class="p-card__content">
                <img class="p-card__image" alt="" src="${item.featured_media}">
                <h3 class="p-heading--4"><a href="${item.link}">${item.title.rendered}</a></h3>
                <p><i>By <a href="${item._embedded.author[0].link}" target="_blank" rel="noopener noreferrer">${item._embedded.author[0].name}</a> on ${pubtime}</i></p>
            </div>
            <p class="p-card__footer">${item._embedded["wp:term"][0][0].name}</p>
        </div>
        `
      })
      document.getElementById("cards").innerHTML = itemsrow;
    })
    .catch((error) => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById("cards").innerHTML = "Error Loading Data";
    });
}

fetchData();