import React from "react";
import { useEffect } from "react";

export default function CustomNewsletterEmailPlaceholder() {
    useEffect(() => {

        const inputElement = document.querySelectorAll('.vtex-store-newsletter-1-x-emailInputContainer input')

        if (inputElement?.length) {
            const item = inputElement.item(0) as HTMLInputElement

            if (item) {
                item.placeholder = 'email'
            }

        }

    }, [])

    return <div className="custom-email-placeholder" />
}