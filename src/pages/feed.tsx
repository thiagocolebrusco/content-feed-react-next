import React from 'react';
import Image from "next/image";

export default function Feed({ data }: { data: ContentCard[] }) {
    return (      
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <h1>Feed</h1>
        <ul>
          {data.map(contentCard => (
            <li key={contentCard.id} className="flex flex-col cursor-pointer bg-white justify-center rounded-lg text-center w-[450px] mt-12 shadow-2xl w-full card-item-div h-[350px]  text-black"
              >
                <div className="block bg-gray-100 object-fill relative">
                  <Image className="object-fill"  src={contentCard.imageUri} alt={contentCard.textData.title} width={250} height={100} />
                </div>
                <p className="text-[24px] font-bold uppercase mb-7">{contentCard.textData.title}</p>
                <p className="text-[15px] font-medium leading-2 w-full">
                  {contentCard.textData.subTitle}
                </p>
              
              {/* <a href="#">
              </a>
              <div className="p-5">
                <a href="#">
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{contentCard.textData.title}</h3>
                    <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{contentCard.textData.subTitle}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{contentCard.textData.body}</p>
              </div> */}
            </li>
          ))}  
        </ul>
      </div>
    )
}

interface ContentCard {
  id: string;
  imageUri: string;
  textData: {
    title: string;
    subTitle: string;
    body: string;
  }
}
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://stoplight.io/mocks/engine/fullstack-spec/52502230/content`, { headers: new Headers({ "Prefer": "code=200, dynamic=true"})})
  const data = await res.json()

  const contentCards: ContentCard[] = data?.contentCards;
  console.log(contentCards?.length);
 
  // Pass data to the page via props
  return { props: { data: contentCards } }
}