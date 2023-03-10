import whitepaper from '@/assets/Aliquo-Whitepaper.pdf';

export default function Whitepaper() {
    return (
        <>
            <embed src={whitepaper} type="application/pdf" width="100%" height="600px" />
        </>
    )
}
