

function Card(data) {
    let image = data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
          
    let transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`

    return (
        <img className='Card'
            style={{ transform }}
            src={image}
            alt=''
        />
    )
};
export default Card;