import Creation from "../../../../components/Instance/Creation"
import EntityService from "../../../../services/entity"
import InstanceService from "../../../../services/instances"
export default function creation({ entity, instance }) {
    return (
        <>
            <Creation entity={entity} instance={instance} />
        </>
    )
}


export async function getServerSideProps({ res, query }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    )

    const entity = await new EntityService().get_entity_by_id(query.entity_id)
    const instance = await new InstanceService().get_instance_by_id(query.id)
    console.info(instance)
    return {
        props: { entity, instance },
    }
}