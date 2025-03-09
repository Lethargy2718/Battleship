export default function resetGridClasses(gridMatrix: HTMLDivElement[][]) {
    gridMatrix.forEach((row: HTMLDivElement[]) =>
        row.forEach((cell: HTMLDivElement) => {
            cell.classList.remove("ship__hover");
            cell.classList.remove("invalid");
        }),
    );
}
