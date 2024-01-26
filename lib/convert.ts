const list = [
    {
        name: "Phenylalanine",
        codons: ["UUU", "UUC"]
    },
    {
        name: "Leucine",
        codons: ["UUA", "UUG", "CUU", "CUC", "CUA", "CUG"]
    },
    {
        name: "Isoleucine",
        codons: ["AUU", "AUC", "AUA"]
    },
    {
        name: "Methionine",
        codons: ["AUG"]
    },
    {
        name: "Valine",
        codons: ["GUU", "GUC", "GUA", "GUG"]
    },
    {
        name: "Serine",
        codons: ["UCU", "UCC", "UCA", "UCG"]
    },
    {
        name: "Proline",
        codons: ["CCU", "CCC", "CCA", "CCG"]
    },
    {
        name: "Threonine",
        codons: ["ACU", "ACC", "ACA", "ACG"]
    },
    {
        name: "Alanine",
        codons: ["GCU", "GCC", "GCA", "GCG"]
    },
    {
        name: "Tyrosine",
        codons: ["UAU", "UAC"]
    },
    {
        name: "Stop",
        codons: ["UAA", "UAG", "UGA"]
    },
    {
        name: "Histidine",
        codons: ["CAU", "CAC"]
    },
    {
        name: "Glutamine",
        codons: ["CAA", "CAG"]
    },
    {
        name: "Asparagine",
        codons: ["AAU", "AAC"]
    },
    {
        name: "Lysine",
        codons: ["AAA", "AAG"]
    },
    {
        name: "Aspartic acid",
        codons: ["GAU", "GAC"]
    },
    {
        name: "Glutamic acid",
        codons: ["GAA", "GAG"]
    },
    {
        name: "Cytesine",
        codons: ["UGU", "UGC"]
    },
    {
        name: "Tyrophytan",
        codons: ["UGG"]
    },
    {
        name: "Arginine",
        codons: ["CGU", "CGC", "CGA", "CGG"]
    },
    {
        name: "Serine",
        codons: ["AGU", "AGC"]
    },
    {
        name: "Arginine",
        codons: ["AGA", "AGG"]
    },
    {
        name: "Glycine",
        codons: ["GGU", "GGC", "GGA", "GGG"]
    }
];

const startCodons = ["UUG", "AUG", "GUG"];
//const stopCodons = ["UAA", "UAG", "UGA"];

//const inputString = "UUGGGUAGAUAG";

export function translate(inputString: string) {
    let loopedString = "";

    let splitStringArray: { codon: string; color?: string; aminoAcid?: string }[] = [];

    let textCodonArray: { codon: string; color?: string; }[] = [];

    let finishedAminoAcidArray = [];

    const inputArray = inputString.split('');
    for (let i = 0; i < inputArray.length; i++) {
        loopedString = loopedString + inputArray[i];
        if (i >= 2) {
            const lastThreeLetters = loopedString.slice(-3);
            if (startCodons.includes(lastThreeLetters)) {
                textCodonArray.push({ codon: loopedString.slice(0, -3), color: 'black' });
                splitStringArray.push({ codon: lastThreeLetters, color: '#1e8a1a' });
                textCodonArray.push({ codon: lastThreeLetters, color: '#1e8a1a' });
                loopSplitStringArray(i);
                break;
            }
        }
    };

    function loopSplitStringArray(startindex: number) {
        for (let i = startindex; i < inputString.length; i++) {
            if (i === startindex) {
                const codon = inputString.slice(i + 1, i + 4);
                const stopCodonsObj = list.find((obj) => obj.name === 'Stop');
                if (stopCodonsObj?.codons.includes(codon)) {
                    const splitStringArrayJoined = splitStringArray.map((obj) => obj.codon).join('');
                    const stopString = inputString.replace(splitStringArrayJoined, '');
                    textCodonArray.push({ codon: stopString, color: 'black' });
                }
                splitStringArray.push({ codon: codon, color: '#dbd753' });
                textCodonArray.push({ codon: codon, color: '#dbd753' });
                if (stopCodonsObj?.codons.includes(codon)) {
                    break;
                }
            } else {
                if (((i - startindex) % 3) === 0) {
                    const codon = inputString.slice(i + 1, i + 4);
                    let returnObj: {codon: string, color?: string} = {
                        codon: codon
                    };
                    if ((i - startindex) % 2 === 0) {
                        returnObj.color = '#dbd753';
                    } else {
                        returnObj.color = '#621470';
                    }
                    const stopCodonsObj = list.find((obj) => obj.name === 'Stop');
                    if (stopCodonsObj?.codons.includes(codon)) {
                        returnObj.color = '#9c0000';
                        splitStringArray.push(returnObj);
                        textCodonArray.push(returnObj);
                        const splitStringArrayJoined = textCodonArray.map((obj) => obj.codon).join('');
                        const stopString = inputString.replace(splitStringArrayJoined, '');
                        textCodonArray.push({ codon: stopString, color: 'black' });
                        break;
                    } else {
                        splitStringArray.push(returnObj);
                        textCodonArray.push(returnObj);
                    }
                }
            }

        }
    }

    if (splitStringArray.length > 0) {
        splitStringArray = splitStringArray.map((codonObj) => {
            const aminoAcidObj = list.find((obj) => obj?.codons.includes(codonObj.codon));
            if (aminoAcidObj) {
                return { ...codonObj, aminoAcid: aminoAcidObj.name };
            } else {
                return codonObj
            }
        }).filter((obj) => obj.aminoAcid);
    }
    /*
        const returnAminoAcidMap = finishedAminoAcidArray.map((item, index) => {
            let returnObj = {
                name: item
            };
            if (index === 0) {
                returnObj.name = `${returnObj.name} (Start)`
                returnObj.color = '#1e8a1a';
            } else {
                if (index + 1 == finishedAminoAcidArray.length) {
                    returnObj.color = '#9c0000';
                } else {
                    if (index % 2 === 0) {
                        returnObj.color = '#dbd753';
                    } else {
                        returnObj.color = '#621470';
                    }
                }
            }
            return returnObj;
        });
        */
    console.log(textCodonArray);
    return {
        translatedArray: splitStringArray,
        textArray: textCodonArray
    }
}
