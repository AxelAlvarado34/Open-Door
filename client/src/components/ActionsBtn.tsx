import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { propertyStore } from '../store/PropertyStore'
import type { PropertyType } from '../types'

type ActionsBtnProps = {
  id: PropertyType['id']
}

export default function ActionsBtn({id} : ActionsBtnProps) {

  const deletProperty = propertyStore(state => state.deleteProperty);

  return (
    <div className="inline-block w-52 text-right">
      <Menu>
        <MenuButton className="cursor-pointer mt-5 rounded-2xl text-white text-lg w-full bg-black p-4 flex items-center gap-1">
          Options
          <ChevronDownIcon className="size-4 text-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-gray-700 bg-gray-900 p-1 text-sm text-white shadow-lg transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-700 focus:bg-gray-700">
              <PencilIcon className="size-4 text-white/50" />
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-hover:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>

          <div className="my-1 h-px bg-gray-700" />

          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-red-600 focus:bg-red-600"
              onClick={()=> {
                deletProperty(id)
              }}
            >
              <TrashIcon className="size-4 text-red-400" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-hover:inline">
                ⌘D
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
