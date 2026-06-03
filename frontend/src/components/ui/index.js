import styled, { keyframes, css } from 'styled-components'

// ── Animations ──────────────────────────────────────────────
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`
export const fadeIn = keyframes`
  from { opacity: 0; } to { opacity: 1; }
`
export const pulse = keyframes`
  0%, 100% { opacity: 1; } 50% { opacity: 0.5; }
`

// ── Card ────────────────────────────────────────────────────
export const Card = styled.div`
  background: ${p => p.theme.colors.white};
  border: 0.5px solid ${p => p.theme.colors.earth[200]};
  border-radius: ${p => p.theme.radius.lg};
  padding: ${p => p.p || '1.25rem'};
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${p => p.delay || '0s'};
  ${p => p.hover && css`
    transition: ${p.theme.transition};
    &:hover { box-shadow: ${p.theme.shadow.md}; transform: translateY(-2px); }
  `}
`

// ── Button ──────────────────────────────────────────────────
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${p => p.size === 'sm' ? '6px 14px' : p.size === 'lg' ? '14px 32px' : '10px 22px'};
  border-radius: ${p => p.theme.radius.md};
  font-family: ${p => p.theme.fonts.body};
  font-size: ${p => p.size === 'sm' ? '13px' : p.size === 'lg' ? '16px' : '14px'};
  font-weight: 500;
  transition: ${p => p.theme.transition};
  cursor: pointer;
  border: none;

  ${p => p.variant === 'primary' && css`
    background: ${p.theme.colors.earth[600]};
    color: ${p.theme.colors.offwhite};
    &:hover { background: ${p.theme.colors.earth[800]}; transform: translateY(-1px); }
    &:active { transform: scale(0.98); }
  `}
  ${p => p.variant === 'gold' && css`
    background: ${p.theme.colors.gold[500]};
    color: ${p.theme.colors.earth[900]};
    font-weight: 600;
    &:hover { background: ${p.theme.colors.gold[400]}; transform: translateY(-1px); }
    &:active { transform: scale(0.98); }
  `}
  ${p => p.variant === 'outline' && css`
    background: transparent;
    border: 1px solid ${p.theme.colors.earth[300]};
    color: ${p.theme.colors.earth[600]};
    &:hover { border-color: ${p.theme.colors.earth[600]}; background: ${p.theme.colors.earth[50]}; }
  `}
  ${p => p.variant === 'ghost' && css`
    background: transparent;
    color: ${p.theme.colors.earth[600]};
    &:hover { background: ${p.theme.colors.earth[100]}; }
  `}
  ${p => p.fullWidth && css`width: 100%;`}
  ${p => p.disabled && css`opacity: 0.5; cursor: not-allowed; pointer-events: none;`}
`

// ── Badge ───────────────────────────────────────────────────
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: ${p => p.theme.radius.full};

  ${p => p.variant === 'success' && css`
    background: ${p.theme.colors.green[100]};
    color: ${p.theme.colors.earth[800]};
  `}
  ${p => p.variant === 'warning' && css`
    background: ${p.theme.colors.gold[200]};
    color: ${p.theme.colors.earth[800]};
  `}
  ${p => p.variant === 'locked' && css`
    background: ${p.theme.colors.earth[100]};
    color: ${p.theme.colors.earth[500]};
  `}
  ${p => p.variant === 'info' && css`
    background: ${p.theme.colors.earth[100]};
    color: ${p.theme.colors.earth[800]};
  `}
`

// ── Input ───────────────────────────────────────────────────
export const Input = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid ${p => p.theme.colors.earth[200]};
  border-radius: ${p => p.theme.radius.md};
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.earth[800]};
  font-family: ${p => p.theme.fonts.body};
  font-size: 14px;
  transition: ${p => p.theme.transition};
  outline: none;

  &::placeholder { color: ${p => p.theme.colors.earth[400]}; }
  &:focus { border-color: ${p => p.theme.colors.gold[500]}; box-shadow: 0 0 0 3px ${p => p.theme.colors.gold[200]}40; }
  &::placeholder { opacity: 1; color: ${p => p.theme.colors.earth[600]}; }
  ${p => p.error && css`border-color: ${p.theme.colors.red[600]};`}
`

export const Select = styled.select`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid ${p => p.theme.colors.earth[200]};
  border-radius: ${p => p.theme.radius.md};
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.earth[800]};
  font-family: ${p => p.theme.fonts.body};
  font-size: 14px;
  transition: ${p => p.theme.transition};
  outline: none;
  cursor: pointer;
  &:focus { border-color: ${p => p.theme.colors.gold[500]}; box-shadow: 0 0 0 3px ${p => p.theme.colors.gold[200]}40; }
`

export const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.theme.colors.earth[600]};
  margin-bottom: 6px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 1.1rem;
`

// ── Metric Card ─────────────────────────────────────────────
export const MetricCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
export const MetricLabel = styled.p`
  font-size: 12px;
  color: ${p => p.theme.colors.earth[500]};
  display: flex;
  align-items: center;
  gap: 5px;
`
export const MetricValue = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: ${p => p.theme.colors.earth[800]};
  font-family: ${p => p.theme.fonts.display};
`
export const MetricSub = styled.p`
  font-size: 11px;
  color: ${p => p.up ? p.theme.colors.earth[800] : p.theme.colors.earth[400]};
`

// ── Section Title ────────────────────────────────────────────
export const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 500;
  color: ${p => p.theme.colors.earth[800]};
  margin-bottom: ${p => p.mb || '1rem'};
`

// ── Divider ──────────────────────────────────────────────────
export const Divider = styled.hr`
  border: none;
  border-top: 0.5px solid ${p => p.theme.colors.earth[200]};
  margin: ${p => p.my || '1rem'} 0;
`

// ── Avatar ───────────────────────────────────────────────────
export const Avatar = styled.div`
  width: ${p => p.size || '40px'};
  height: ${p => p.size || '40px'};
  border-radius: 50%;
  background: ${p => p.theme.colors.gold[500]};
  color: ${p => p.theme.colors.earth[900]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${p => p.fontSize || '14px'};
  font-weight: 600;
  flex-shrink: 0;
`

// ── Empty State ──────────────────────────────────────────────
export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${p => p.theme.colors.earth[400]};
  font-size: 14px;
`
