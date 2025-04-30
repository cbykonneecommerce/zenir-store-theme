import React, { Fragment, useState } from 'react'
import { useMutation } from 'react-apollo'
import InputMask from 'react-input-mask'
import { useCssHandles } from 'vtex.css-handles'
import { Button, withToast } from 'vtex.styleguide'

import SEND_FALE_CONOSCO from './graphql/sendFaleConosco.gql'

import './FaleConosco.css'

const CSS_HANDLES = [
  'formFaleConosco',
  'faleConoscoSuccessContainer',
  'formBox',
  'inputArea',
]

const CustomInputMask = InputMask as any

export interface CustomFormProps {
  showToast: (params: { message: string; action: any }) => any
}

interface UserInput {
  nome: string
  cpf: string
  email: string
  minuta: string
  telefone: string
  assunto: string
  messagem: string
}

interface UserDocumentInputFaleConosco {
  key: string
  value: string | any
}

function FaleConosco({ showToast }: CustomFormProps) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [success, setSuccess] = useState<boolean>(false)
  const [sendDocument, { loading }] = useMutation<
    any,
    { input: { fields: UserDocumentInputFaleConosco[] } }
  >(SEND_FALE_CONOSCO)

  const [user, setUser] = useState<any | UserInput>({
    nome: '',
    cpf: '',
    email: '',
    minuta: '',
    telefone: '',
    assunto: '',
    messagem: '',
  })

  const handleChangeUser = (input: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [input.target.name]: input.target.value })

  const handleChangeUserTextArea = (
    input: React.ChangeEvent<HTMLTextAreaElement>
  ) => setUser({ ...user, [input.target.name]: input.target.value })

  const handlesSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const fields = Object.keys(user).map((field: string) => ({
      key: field,
      value: user[field],
    }))

    try {
      await sendDocument({
        variables: {
          input: {
            fields,
          },
        },
      })

      showToast({
        action: null,
        message: 'Dados enviados com sucesso!',
      })

      setSuccess(true)
    } catch (error) {
      showToast({
        action: null,
        message: 'Não foi possível enviar os dados no momento!',
      })
    }
  }

  return (
    <form onSubmit={handlesSubmit} className={handles.formFaleConosco}>
      {success ? (
        <div className={handles.faleConoscoSuccessContainer}>
          <p>Formulário foi enviado com sucesso!</p>
        </div>
      ) : (
        <Fragment>
          <div className={handles.formBox}>
            <div className={handles.inputArea}>
              <label>
                Nome completo <span>*</span>
              </label>
              <input
                name="nome"
                onChange={handleChangeUser}
                value={user.nome}
                required
                disabled={loading}
                className="form-input"
              />
            </div>

            <div className={handles.inputArea}>
              <label>
                CPF <span>*</span>
              </label>
              <CustomInputMask
                mask="999.999.999-99"
                onChange={handleChangeUser}
                value={user.cpf}
                required
                name="cpf"
                disabled={loading}
                className="form-input"
              />
            </div>
          </div>
          <div>
            <div className={handles.inputArea}>
              <label>
                E-Mail <span>*</span>
              </label>
              <input
                onChange={handleChangeUser}
                required
                value={user.email}
                name="email"
                disabled={loading}
                type="email"
                className="form-input area-total-email"
              />
            </div>
          </div>
          <div className={handles.formBox}>
            <div className={handles.inputArea}>
              <label>
                Telefone <span>*</span>
              </label>
              <CustomInputMask
                onChange={handleChangeUser}
                value={user.telefone}
                required
                mask="(99) 99999-9999"
                name="telefone"
                disabled={loading}
                type="tel"
              />
            </div>

            <div className={handles.inputArea}>
              <label>
                Assunto <span>*</span>
              </label>
              <input
                onChange={handleChangeUser}
                required
                value={user.assunto}
                name="assunto"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label>
              Mensagem <span>*</span>
            </label>
            <textarea
              onChange={handleChangeUserTextArea}
              required
              value={user.messagem}
              name="messagem"
              disabled={loading}
            />
          </div>
          <Button
            onClick={handlesSubmit}
            disabled={loading}
            isLoading={loading}
          >
            Enviar
          </Button>
        </Fragment>
      )}
    </form>
  )
}

export default withToast(FaleConosco)
