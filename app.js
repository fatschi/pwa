const { Component, h, render } = preact

const startUrl = 'https://api.instagram.com/v1/users/4725130256/media/recent?access_token=4725130256.1677ed0.3eddbc3d1f0e458486c8f9a99f449552';
const fetchUrl = function (sUrl) {
    fetch(sUrl)
        .then((resp) => resp.json())
        .then(function (response) {
            if (response.pagination && response.pagination.next_url) {
                fetchUrl(response.pagination.next_url);
            }
            if (response.data) {
                const newImages = response.data.forEach((image) => {
                    if (image.tags.indexOf("fatschissuperduperfahrradreiseblog") > -1) {
                        let img = document.createElement("img");
                        img.src = image.images.standard_resolution.url;
                        document.getElementById('insta').appendChild(img);
                    }
                });
            }
        })
        .catch(function (error) {
            console.error(JSON.stringify(error));
        });
}
fetchUrl(startUrl);

class Greeting extends Component {
    render() {
        return (<p>Hello world</p>);
    }
}
render(
    <Greeting />,
    document.getElementById('root')
);
