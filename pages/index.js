import Head from 'next/head';
import { useState } from 'react';

const uploadImages = async (file) => {
  const body = new FormData();
  body.append('file', file);
  const options = {
    method: 'POST',
    body,
    headers: {
      Authorization: `${process.env.NEXT_PUBLIC_NFTPORT_API_KEY}`,
    },
  };
  fetch('https://api.nftport.xyz/v0/files', options)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    });
};

export default function Home() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageUrl = uploadImages(image);
    const formData = new FormData(document.querySelector('form'));
    formData.append('file', image);
    console.log(formData.values());
    console.log(JSON.stringify(formData.values()));
    console.log(formData.get('name'));
  };

  return (
    <div className="py-0 px-8">
      <Head>
        <title>NFT Collection Generator</title>
        <meta name="description" content="Create an NFT Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen py-16 flex flex-col items-center justify-between">
        <div>
          <h1 className="text-4xl pb-2">Create an NFT Collection!</h1>
        </div>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            {image && (
              <div className="pb-2 max-w-[300px] ">
                <img src={URL.createObjectURL(image)} />
              </div>
            )}
            <div>
              <input
                className="w-full"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Collection Name"
                name="collection"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Collection Symbol"
                name="symbol"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Collection Owner Address"
                name="owner_address"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Collection Treasury Address"
                name="treasury_address"
              />
            </div>
            <div>
              <label htmlFor="public_mint_start_date" className="pr-2">
                Mint starts:
              </label>
              <input
                className="w-full"
                type="date"
                placeholder="Collection Treasury Address"
                name="public_mint_start_date"
                id="public_mint_start_date"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="number"
                placeholder="Number of NFTs"
                name="max_supply"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Individual NFT Name"
                name="name"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Individual NFT Description"
                name="description"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="number"
                placeholder="Mint Price per NFT"
                name="mint_price"
              />
            </div>
            <div className="my-1 bg-slate-300 cursor-pointer flex justify-center p-1 rounded">
              <button type="submit">Generate Collection</button>
            </div>
          </form>
        </div>
        <div>
          <footer className="flex py-8 border-t-blue items-center justify-center">
            <p>On Deck Hackathon</p>
          </footer>
        </div>
      </main>
    </div>
  );
}