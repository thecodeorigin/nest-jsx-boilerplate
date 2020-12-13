/**
 * @usage 
 * Wrap permission into an object with multiple of component, 
 * inside each component, there will be multiple objects having 
 * 2 properties: "component" & "action"
 * 
 * @example
 * PERMISSIONS.USER.CREATE_ALL => { 
 *  component: 'USER', 
 *  action: 'CREATE_ALL' 
 * }
 */
export const PERMISSIONS = {
  PERMISSION: {
    READ_ALL: 'READ_ALL'
  },
  USER: {
    CREATE_ALL: 'CREATE_ALL', 
    READ_ALL: 'READ_ALL', 
    READ_TRASH_ALL: 'READ_TRASH_ALL',
    UPDATE_ALL: 'UPDATE_ALL', 
    UPDATE_SELF: 'UPDATE_SELF', 
    DELETE_ALL: 'DELETE_ALL', 
    SOFT_DELETE_ALL: 'SOFT_DELETE_ALL', 
    RESTORE_ALL: 'RESTORE_ALL',
  },
  ROLE: {
    CREATE_ALL: 'CREATE_ALL', 
    READ_ALL: 'READ_ALL', 
    READ_TRASH_ALL: 'READ_TRASH_ALL',
    UPDATE_ALL: 'UPDATE_ALL', 
    DELETE_ALL: 'DELETE_ALL', 
    SOFT_DELETE_ALL: 'SOFT_DELETE_ALL', 
    RESTORE_ALL: 'RESTORE_ALL',
  },
  "CATEGORY": {
    CREATE_ALL: 'CREATE_ALL', 
    READ_ALL: 'READ_ALL', 
    READ_TRASH_ALL: 'READ_TRASH_ALL',
    UPDATE_ALL: 'UPDATE_ALL', 
    DELETE_ALL: 'DELETE_ALL', 
    SOFT_DELETE_ALL: 'SOFT_DELETE_ALL', 
    RESTORE_ALL: 'RESTORE_ALL',
  },
}
Object.keys(PERMISSIONS).forEach(component => {
  const detail = {...PERMISSIONS[component]}
  Object.keys(PERMISSIONS[component]).forEach(attribute => {
    detail[attribute] = {
      component,
      action: attribute
    }
  })
  PERMISSIONS[component] = detail
})

/**
 * @usage 
 * Take components name as 
 * a enum but its a constant
 * 
 * @example
 * COMPONENT.USER => "USER"
 */
export const COMPONENTS = { ...PERMISSIONS }
Object.keys(COMPONENTS).map(component => {
  COMPONENTS[component] = component
})
