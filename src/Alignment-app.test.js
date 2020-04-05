import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import AlignmentApp from "./Alignment-app";

test('test with input "cat, cricket"', () => {
    const {getByTestId} = render(<AlignmentApp />);

    let seq1 = "cat";
    let seq2 = "cricket";

    fireEvent.change(getByTestId('input1'), {target: {value: seq1}});
    fireEvent.change(getByTestId('input2'), {target: {value: seq2}});
    getByTestId('processBtn').click();

    expect(getByTestId('resultSeq1').textContent).toBe('---c-at');
    expect(getByTestId('resultSeq2').textContent).toBe('cricket');
});

test('test with long input #1', () => {
    const {getByTestId} = render(<AlignmentApp />);

    let seq1 = "tynhmcqfhcryvnnhsgeklyecnerskafscpshlqchkrrqigekthehnqcgkafpt";
    let seq2 = "yecnqcgkafaqhsslkchyrthigekpyecnqcgkafsk";

    fireEvent.change(getByTestId('input1'), {target: {value: seq1}});
    fireEvent.change(getByTestId('input2'), {target: {value: seq2}});
    getByTestId('processBtn').click();

    expect(getByTestId('resultSeq1').textContent).toBe('tynhmcqfhcryvnnhsgeklyecnerskafscpshlqchkrrqigekthehnqcgkafpt');
    expect(getByTestId('resultSeq2').textContent).toBe('---------------------yecnqcgkafaqhsslkchyrthigekpyecnqcgkafsk');
});

test('test with long input #2', () => {
    const {getByTestId} = render(<AlignmentApp />);

    let seq1 = "pshlqyherthtgekpyechqcgqrfkkcsllqrhkrthtgekpyecnqcgkafaq";
    let seq2 = "hshlqchkrthtgekpyecnqcgkafsqhgllqrhkrthtgekpymnvinmvkplhns";

    fireEvent.change(getByTestId('input1'), {target: {value: seq1}});
    fireEvent.change(getByTestId('input2'), {target: {value: seq2}});
    getByTestId('processBtn').click();

    expect(getByTestId('resultSeq1').textContent).toBe('pshlqyherthtgekpyechqcgqrfkkcsllqrhkrthtgekpy--ecnqcgkafaq');
    expect(getByTestId('resultSeq2').textContent).toBe('hshlqchkrthtgekpyecnqcgkafsqhgllqrhkrthtgekpymnvinmvkplhns');
});