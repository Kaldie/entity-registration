const shoud_check_entity = (searchOptions) => {
    let should_check = false
    should_check |= !searchOptions
    should_check |= searchOptions && searchOptions.at(0) === "entity"
    return should_check
}

const should_check_for_entity_name = (searchOptions) => {
    let should_check = shoud_check_entity()
    should_check &= !searchOptions || (searchOptions.at(1) === "name" || searchOptions.at(1) === "all")
    return should_check
}

const should_check_for_attribute_name = (searchOptions) => {
    let should_check = shoud_check_entity(searchOptions)
    should_check &= !searchOptions || (searchOptions.at(1) === "attribute.name" || searchOptions.at(1) === "all")
    return should_check
}

export const filter_entities = (search_value, searchOptions, entities) => {
    return entities.reduce((selected_values, element) => {
        const has_name = element.name.includes(search_value)
        const has_named_attribute = element.attributes ? element.attributes.reduce((prev_value, current_attribute) =>
            prev_value || current_attribute.name.includes(search_value)
            , false) : false
        if ((has_name && should_check_for_entity_name(searchOptions)) ||
            (has_named_attribute && should_check_for_attribute_name(searchOptions)))
            selected_values.push(element)

        return selected_values

    }, [])
}