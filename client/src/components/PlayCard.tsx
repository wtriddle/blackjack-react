// Visual for dealt card

const style = {
    display: "flex",
    padding: 5
};


interface PlayerCardInputs {
    img_src: string
}

function PlayCard({img_src}:PlayerCardInputs) {
    return (
        <div style={style}>
            <img width="125" height="180" src={img_src}/>
        </div>
    )
}

export default PlayCard;