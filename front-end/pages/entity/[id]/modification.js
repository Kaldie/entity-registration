import Creation from '../../../components/Creation'
import EntityService from '../../../services/entity'



export default function creation({ data }) {
    return (
        <>
            <Creation entity={data} />
        </>
    )
}


export async function getServerSideProps({ res, query }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const data = await new EntityService().get_entity_by_id(query.id)

    return {
        props: { data },
    }
}