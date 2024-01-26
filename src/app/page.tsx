'use client';

import Image from 'next/image';
import { translate } from '../../lib/convert';
import { useState } from 'react';

export default function Home() {
  interface translatedResultObj {
    translatedArray: {
      aminoAcid?: string | undefined,
      codon: string,
      color?: string | undefined,
    }[],
    textArray: {
      codon: string,
      color?: string | undefined
    }[]
  }
  const [translatedResult, setTranslatedResult] = useState<translatedResultObj>({
    translatedArray: [],
    textArray: []
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value;
    const result = translate(fieldValue);
    setTranslatedResult(result);
    console.log(translatedResult.translatedArray)
  }
  const handleInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target;
    const plainFieldValue = fieldValue.outerHTML.replace(/<[^>]+>/g, '');
    const result = translate(plainFieldValue);
    setTranslatedResult(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <Image
          className="dark:invert"
          src="/codonvert-ai2.svg"
          alt="Codonvert Logo"
          width={320}
          height={64}
          priority
        />
      </div>
      <div className="font-display font-semibold text-center">
        <h3>Convert any mRNA sequence to Amino Acids.</h3>
      </div>
      <div className="font-display">
        <input className="shadow appearance-none rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-neutral-800" id="codon" type="text" placeholder="Enter a Codon (e.g. AUG)" onChange={handleInput} />
      </div>
      <div className="font-display">
        <p className="font-display text-3xl" contentEditable="false" onInput={handleInput2}>
          {
            translatedResult.textArray.map((item, index) => (
              <span
                key={`Text-${index}`}
                className={
                  item.color === "black" ? "text-black dark:text-white" :
                    item.color === "#1e8a1a" ? "text-[#1e8a1a]" :
                      item.color === "#dbd753" ? "text-[#dbd753]" :
                        item.color === "#621470" ? "text-[#621470]" : "text-[#9c0000]"
                }
              >{item.codon}</span>
            ))
          }
        </p>
      </div>
      <div className="flex space-x-4">
        {translatedResult.translatedArray.map((item, index) => (
          <button
            className={`font-display ${item.color === "black" ? "bg-black" :
                item.color === "#1e8a1a" ? "bg-[#1e8a1a]" :
                  item.color === "#dbd753" ? "bg-[#dbd753]" :
                    item.color === "#621470" ? "bg-[#621470]" : "bg-[#9c0000]"
              } text-white font-bold py-2 px-4 rounded space-x-5 rounded-lg`}
            type='submit'
            disabled={true}
            key={`Button-${index}`}
          >
            {item.aminoAcid}
          </button>
        ))}
      </div>
    </main>
  )
}
