'use client';

export interface inputTypeParam {
    px: number; py: number; contextSize: number;
}

export interface inputType {
    show: (prop: inputTypeParam) => React.JSX.Element;
    value: string;
}

export interface fieldType {
    readonly x: number;
    readonly y: number;
    readonly expand: number;
    readonly afterText: string | null;
    readonly inputType: inputType;
}

export interface Command {
    readonly name: string;
    readonly color: string;
    readonly gridSize: number;
    readonly columnCount: number;
    readonly value: fieldType[];
    readonly isStart: boolean;
    readonly displayFirst: boolean;
    lastx: number;
    lasty: number;
    posx: number;
    posy: number;
    output1: number;
    output2: number;
}

// field type
export const textInput: fieldType = {
    x: 0,
    y: 0,
    expand: 1,
    afterText: "type",
    inputType: {
        show: function (props: inputTypeParam): React.JSX.Element {
            return <div></div>
        },
        value: 'coin card'
    }
}

// commands
export const defaultCommand: Command = {
    name: "",
    color: "#5ABFFA",
    gridSize: 0,
    columnCount: 0,
    value: [],
    isStart: false,
    displayFirst: false,
    lastx: 0,
    lasty: 0,
    posx: 0,
    posy: 0,
    output1: -1,
    output2: -1,
};

// start operator
export const start: Command = {
    ...defaultCommand,
    name: "Start Command",
    color: "#5ABFFA",
    gridSize: 0,
    value: []
}

// io control
export const read: Command = {
    ...defaultCommand,
    name: "Read Cell",
    color: "#8782FE",
    gridSize: 2,
    columnCount: 2,
    value: [
        {...textInput},
        {...textInput, x: 1, y: 1}
    ],
};
