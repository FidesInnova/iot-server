import classNames from 'classnames'
import { FormItem } from '@/components/ui/Form'
import type { PropsWithChildren } from 'react'
import type { FormikTouched, FormikErrors } from 'formik'

// Update the name type to allow nested keys
type NestedKeyOf<T> = T extends object
    ? {
          [K in keyof T]: T[K] extends object
              ? `${string & K}.${NestedKeyOf<T[K]>}` | `${string & K}`
              : `${string & K}`
      }[keyof T]
    : never

type FormRow<T> = PropsWithChildren<{
    label: string
    errors: FormikErrors<T>
    touched: FormikTouched<T>
    name: NestedKeyOf<T> // Support nested keys
    border?: boolean
    alignCenter?: boolean
}>

const FormRow = <T extends Record<string, unknown>>(props: FormRow<T>) => {
    const {
        label,
        children,
        errors,
        touched,
        name,
        border = true,
        alignCenter = true,
    } = props

    return (
        <div
            className={classNames(
                'grid md:grid-cols-3 gap-4 py-8',
                border && 'border-b border-gray-200 dark:border-gray-600',
                alignCenter && 'items-center'
            )}
        >
            <div className="font-semibold">{label}</div>
            <div className="col-span-2">
                <FormItem
                    className="mb-0 max-w-[700px]"
                    invalid={(errors[name] && touched[name]) as boolean}
                    errorMessage={errors[name] as string}
                >
                    {children}
                </FormItem>
            </div>
        </div>
    )
}

export default FormRow
