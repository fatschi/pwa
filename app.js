const { Component, h, render } = preact
class Greeting extends Component {
    render() {
        return (<p>Hello world</p>);
    }
}
render(
    <Greeting />,
    document.getElementById('root')
);
