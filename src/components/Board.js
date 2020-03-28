import React, {Component} from 'react'

class Board extends Component {
    constructor(){
        super()
        this.state = {
            players: ['X','O'],
            squares: Array(9).fill(null),
            player1Move: true,
            winner: null,
            numPlays: 0
        }
    }

    evaluateWin(){
        const wins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for(let i = 0; i < wins.length; i++){
            if(this.state.squares[wins[i][0]] && 
                this.state.squares[wins[i][0]] === this.state.squares[wins[i][1]] && 
                this.state.squares[wins[i][1]] === this.state.squares[wins[i][2]]) {
                    this.setState(() => {
                        return {winner: this.state.squares[wins[i][0]]}
                    })
                }
        }
    }

    resetEvent(){
        this.setState({
            squares: Array(9).fill(null),
            //player1Move: true,
            winner: null,
            numPlays: 0
        })
    }

    handleClick(i) {
        if (this.state.squares[i] === null) {
            let cSquares = this.state.squares.slice()
            cSquares[i] = this.state.player1Move ? this.state.players[0] : this.state.players[1]
            this.setState({
                squares: cSquares,
                player1Move: !this.state.player1Move,
                numPlays: this.state.numPlays + 1
            })
        }
    }
    
    renderSquare(i) {
        return <button className='square' onClick={() => this.handleClick(i)}>{this.state.squares[i]}</button>
    }

    componentDidUpdate(){
        if(!this.state.winner) {
            this.evaluateWin()
        }
    }

    render() {
        return this.state.winner ? (
            <div className='center'>
                <h1>Vencedor: {this.state.winner}</h1>
                <button id='reset' onClick={()=>this.resetEvent()}>Jogar novamente</button>
            </div>
        ) :
        (
            <div>
                <h1 className='center'>Jogo do Galo</h1>
                <table className='center'>
                    <tr>
                        <td>{this.renderSquare(0)}</td>
                        <td>{this.renderSquare(1)}</td>
                        <td>{this.renderSquare(2)}</td>
                    </tr>
                    <tr>
                        <td>{this.renderSquare(3)}</td>
                        <td>{this.renderSquare(4)}</td>
                        <td>{this.renderSquare(5)}</td>
                    </tr>
                    <tr>
                        <td>{this.renderSquare(6)}</td>
                        <td>{this.renderSquare(7)}</td>
                        <td>{this.renderSquare(8)}</td>
                    </tr>
                </table>
                <h2 className='center'>Próximo jogador: {this.state.player1Move ? this.state.players[0] : this.state.players[1]}</h2>
                <div className='center'>
                    {this.state.numPlays === 9 ? 
                    <button id='reset' onClick={() => this.resetEvent()}>Empate: Novo Jogo</button> : 
                    null}
                </div>
            </div>
        )
    }
}

export default Board