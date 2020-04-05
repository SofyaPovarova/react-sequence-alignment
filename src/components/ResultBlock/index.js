import React from 'react';
import './index.css';

const ResultBlock = props => {
    const alignSequences = () => {
        const seq1 = props.seq1;
        const seq2 = props.seq2;

        const mismatchPenalty = 2;
        const gapPenalty = 3;

        const m = seq1.length;
        const n = seq2.length;
        const l = n + m;

        let dp = Array(l+ 1).fill(0).map(x => Array(l + 1).fill(0));
        for (let i = 0; i <= l; i++) {
            dp[i][0] = i * gapPenalty;
            dp[0][i] = i * gapPenalty;
        }

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (seq1[i - 1] === seq2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(Math.min(
                        dp[i - 1][j - 1] + mismatchPenalty,
                        dp[i - 1][j] + gapPenalty),
                        dp[i][j - 1] + gapPenalty);
                }
            }
        }

        let alSeq1 = Array(l+1);
        let alSeq2 = Array(l+1);

        let i = m;
        let j = n;

        let pos1 = l;
        let pos2 = l;

        while ( i !== 0 && j !== 0) {
            if (seq1[i - 1] === seq2[j - 1]) {
                alSeq1[pos1--] = seq1[i-1];
                alSeq2[pos2--] = seq2[j-1];
                i--;
                j--;
            } else if (dp[i - 1][j - 1] + mismatchPenalty === dp[i][j]) {
                alSeq1[pos1--] = seq1[i-1];
                alSeq2[pos2--] = seq2[j-1];
                i--;
                j--;
            } else if (dp[i - 1][j] + gapPenalty === dp[i][j]) {
                alSeq1[pos1--] = seq1[i-1];
                alSeq2[pos2--] = '-';
                i--;
            } else if (dp[i][j - 1] + gapPenalty === dp[i][j]) {
                alSeq1[pos1--] = '-';
                alSeq2[pos2--] = seq2[j-1];
                j--;
            }
        }

        while (pos1 > 0) {
            if (i > 0) alSeq1[pos1--] = seq1[--i];
            else alSeq1[pos1--] = '-';
        }
        while (pos2 > 0) {
            if (j > 0) alSeq2[pos2--] = seq2[--j];
            else alSeq2[pos2--] = '-';
        }

        let start = 1;
        for (i = l; i >= 1; i--) {
            if (alSeq2[i] === '-' && alSeq1[i] === '-') {
                start = i + 1;
                break;
            }
        }

        return [alSeq1.slice(start), alSeq2.slice(start)];
    };

    const renderColoredSeq = ([seq1, seq2]) => {
        let colSeq1 = [];
        let colSeq2 = [];
        for (let i = 0; i < seq1.length; i++) {
            if (seq1[i] === seq2[i]) {
                colSeq1.push(
                    <span key={`sym${i}`} style={{color: 'green', fontWeight: 'bold'}}>
                        {seq1[i]}
                    </span>
                );
                colSeq2.push(
                    <span key={`sym${i}`} style={{color: 'green', fontWeight: 'bold'}}>
                        {seq1[i]}
                    </span>
                )
            } else {
                colSeq1.push(
                    <span key={`sym${i}`} style={{color: 'gray'}}>
                        {seq1[i]}
                    </span>
                );
                colSeq2.push(
                    <span key={`sym${i}`} style={{color: 'gray'}}>
                        {seq2[i]}
                    </span>
                )
            }

        }

        return (
            <div className="alignment">
                <div data-testid="resultSeq1" className="result-seq">
                    {colSeq1}
                </div>
                <div data-testid="resultSeq2" className="result-seq">
                    {colSeq2}
                </div>

            </div>
        )
    };

    const renderResult = () => {
        if (props.status !== "result") {
            return "";
        }

        return (
            <div className="result-block">
                {renderColoredSeq(alignSequences())}
                <button className="reset" name="reset" value="reset" onClick={props.reset}>reset</button>
            </div>
        )
    };

    return renderResult();
};

export default ResultBlock;