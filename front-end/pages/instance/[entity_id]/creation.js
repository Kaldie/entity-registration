import Creation from "../../../components/Instance/Creation"
import EntityService from "../../../services/entity"
export default function creation({ entity }) {
    return (
        <>
            <Creation entity={entity} />
        </>
    )
}


export async function getServerSideProps({ res, query }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    )

    const entity = await new EntityService().get_entity_by_id(query.entity_id)

    return {
        props: { entity },
    }
}