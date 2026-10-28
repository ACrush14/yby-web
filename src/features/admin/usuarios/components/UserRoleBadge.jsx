import React from 'react';
import { getUserRoleTheme } from '@/domain/constants/userRoles.js';

/**
 * Chip/Badge visual estilizado com as 5 cores oficiais dos papéis de usuário.
 *
 * @param {Object} props
 * @param {string} props.roleId - ID do papel do usuário
 * @param {string} [props.className]
 */
export function UserRoleBadge({ roleId, className = '' }) {
  const theme = getUserRoleTheme(roleId);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${className}`}
      style={{
        backgroundColor: theme.bg,
        color: theme.color,
        borderColor: theme.border,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0"
        style={{ backgroundColor: theme.color }}
      />
      {theme.shortLabel || theme.label}
    </span>
  );
}
