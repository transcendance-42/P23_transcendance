import mascot1 from "../../assets/mascot1.png"
import mascot2 from "../../assets/mascot2.png"
import mascot3 from "../../assets/mascot3.png"
import mascot4 from "../../assets/mascot4.png"
import mascot5 from "../../assets/mascot5.png"
import mascot6 from "../../assets/mascot6.png"

const mascots = [mascot1, mascot2, mascot3, mascot4, mascot5, mascot6]

const sizes = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-40 h-40',
    xl: 'w-64 h-64'
}

const Mascot = ({index = 0, size = 'md'}) => (
    <img
        src={mascots[index]}
        alt="Tindog mascot"
        className={`${sizes[size]} object-contain pointer-events-none`}
    />
)

export default Mascot