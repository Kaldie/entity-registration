import Exploration from '../../components/Exploration'
import EntityService from '../../services/entity'

export default function creation({ data }) {
    return (
        <>
            <Exploration data={data} />
        </>
    )
}

export async function getServerSideProps({ res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const data = await new EntityService().get_all_entities_as_list()

    return {
        props: { data },
    }
}