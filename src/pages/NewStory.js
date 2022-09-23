
import { useState } from "react";
import { useMoralis, useMoralisFile, useWeb3ExecuteFunction } from "react-moralis";
import "./NewStory.css";


const NewStory = () => {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { saveFile } = useMoralisFile();
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction(); 

  const mint = async (account, uri) => {

    let options = {
      contractAddress: "0x7078c17AFA308b61D122a3ACe71C1d1Da3db1Fe4",
      functionName: "safeMint",
      abi: [
        {
        inputs:[
          {
            internalType:"address",
           name:"to",
           type:"address"
          },
           {
            internalType:"string",
           name:"uri",
           type:"string"
          }
        ],
        name:"safeMint",
        outputs:[],
        stateMutability:"payable",
        type:"function"
      }
      ],
      params: {
        to: account,
        uri: uri,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Successful Mint");
        setText("");
        setTitle("");
      },
      onError: (error) => {
        alert(error.message);
      },
    });

  }

  const uploadFile = async (event) => {
    event.preventDefault();
    const textArray = text.split();
    const metadata = {
      title,
      text: textArray,
    };

    try {
      const result = await saveFile(
        "myblog.json",
        { base64: btoa(JSON.stringify(metadata)) },
        {
          type: "base64",
          saveIPFS: true,
        }
      );
     const nftResult = await uploadNftMetadata(result.ipfs())

      await mint(account, nftResult.ipfs());
    } catch(error) {
      alert(error.message);
    }

  }

  const uploadNftMetadata = async (url) => {
    const metadataNft = {
      image:"https://ipfs.moralis.io:2053/ipfs/QmWEsG4ayh75BMk2H1CowAdALPjsi3fD7CSZ6qxNM1yNnz/image/moralis.png",
      description: title,
      externalUrl: url,
    };

    const resultNft = await saveFile(
      "metadata.json",
      { base64: btoa(JSON.stringify(metadataNft)) },
      {
        type: "base64",
        saveIPFS: true,
      }
    );
    return resultNft;
  };


  return (
    <>
        <div className="bg">
          <form onSubmit = {uploadFile} className="writeForm">
            <div className="writeFormGroup">
              <input className="writeInput"
                    placeholder="Title"
                    type="text"
                    autoFocus = {true}
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)} 
              />
            </div>
            <div className="writeFormGroup">
            <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            autoFocus = {true}
            value = {text}
            onChange = {(e) => setText(e.target.value)}
            />
            </div>
            <button className="writeSubmit" type="submit">
              Publish 
            </button>
          </form>
        </div>
    </>
  );
};

export default NewStory;
