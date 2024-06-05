import { Api } from '@web/domain'
import { CoreStoreContext } from '../../core/store/store'

export namespace GlobalService {
  type InitialiseStoreOptions = {
    store: CoreStoreContext,
    role: {
      name: string
    }
  }

  export const initialiseStore = async ({
    store,
    role
  }: InitialiseStoreOptions): Promise<void> => {

    store.setRoles([role])

  }

  type CleanOptions = {
    store: CoreStoreContext
  }

  export const cleanStore = async ({ store }: CleanOptions): Promise<void> => {
    // clean your store here
    store.setRoles([])
  }
}
