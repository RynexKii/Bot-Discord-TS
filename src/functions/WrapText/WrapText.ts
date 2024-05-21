// Função que quebra o texto em certas quantidades de letras
export function wrapText(text: string, maxLineLength: number) {
    const words = text.split(" ");
    let currentLine = "";
    const lines = [];

    for (const word of words) {
        if ((currentLine + word).length > maxLineLength) {
            lines.push(currentLine.trim());
            currentLine = "";
        }
        currentLine += word + " ";
    }

    if (currentLine.length > 0) {
        lines.push(currentLine.trim());
    }

    return lines.join("\n");
}
