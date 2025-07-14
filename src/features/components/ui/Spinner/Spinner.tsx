import Image from 'next/image';
export const Spinner = () => {
    return (
        <div
            style={{
                display: 'flex',
                width: '1000px',
                justifyContent: 'center',
                margin: '10px auto',
            }}
        >
            <Image
                src={'/spinner/spinner.svg'}
                alt="spinner"
                width={40}
                height={40}
            />
        </div>
    );
};
