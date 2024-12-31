import VLCPlayerComponent from "./Player";
const Home  = () => {
    return (
        <>
            <VLCPlayerComponent 
                videoSource={"/feed.mkv"}
                options = {"--codec=webcodec --aout=emworklet_audio -vv --input-repeat=10000"}
                width="700px"
            />
        </>
    );
};

export default Home;