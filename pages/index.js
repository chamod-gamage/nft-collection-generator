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

  return await fetch('https://api.nftport.xyz/v0/files', options)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res.ipfs_url;
    });
};

const uploadMetadata = async (collection, supply, metadata) => {
  fetch(
    `http://localhost:3000/api/metadata?collection=${collection}&supply=${supply}`,
    {
      method: 'POST',
      body: JSON.stringify({ metadata }),
    }
  );
};

export default function Home() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const imageUrl = await uploadImages(image);
    const formData = new FormData(document.querySelector('form'));
    await uploadMetadata(
      formData.get('collection'),
      formData.get('max_supply'),
      {
        name: formData.get('name'),
        description: formData.get('description'),
        image: imageUrl,
      }
    );

    formData.append('file', image);
    console.log(formData.values());
    console.log(JSON.stringify(formData.values()));
    console.log(formData.get('name'));
    setLoading(false);
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
                required
                onChange={handleImageChange}
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Collection Name"
                required
                name="collection"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Collection Symbol"
                required
                name="symbol"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Collection Owner Address"
                required
                name="owner_address"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Collection Treasury Address"
                required
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
                required
                name="public_mint_start_date"
                id="public_mint_start_date"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="number"
                placeholder="Number of NFTs"
                required
                name="max_supply"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Individual NFT Name"
                required
                name="name"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                placeholder="Individual NFT Description"
                required
                name="description"
              />
            </div>
            <div>
              <input
                className="w-full"
                type="number"
                placeholder="Mint Price per NFT"
                required
                name="mint_price"
              />
            </div>
            <div className="my-1 bg-slate-300 cursor-pointer flex justify-center p-1 rounded disabled:bg-slate-600">
              <button disabled={loading} type="submit">
                Generate Collection
              </button>
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
