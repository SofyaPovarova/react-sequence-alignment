import React from 'react';
import './index.css';


const InputBlock= (props) => {
    const seq1 = props.seq1;
    const seq2 = props.seq2;

    return (
        <div className="input-block" data-testid="inputArea">
            <form className="input-form">
                <p className="input-title">enter sequences to align</p>
                <input name="seq1"
                       data-testid="input1"
                       className="input-seq"
                       value={seq1}
                       onChange={props.change}
                       placeholder="first sequence"
                       disabled={props.status === "result"}
                />
                <input name="seq2"
                       data-testid="input2"
                       className="input-seq"
                       value={seq2}
                       onChange={props.change}
                       placeholder="second sequence"
                       disabled={props.status === "result"}
                />
                <button
                    data-testid="processBtn"
                    type="button"
                    onClick={props.changeStatus}
                >✅</button>
            </form>
        </div>
    )
};

export default InputBlock;