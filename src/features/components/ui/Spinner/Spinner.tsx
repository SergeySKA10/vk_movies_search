import Image from 'next/image';
import './Spinner.scss';
import './SpinnerMedia.scss';

export const Spinner = () => {
    return (
        <div className="spinner">
            <Image
                src={'/spinner/spinner.svg'}
                alt="spinner"
                width={40}
                height={40}
            />
        </div>
    );
};
