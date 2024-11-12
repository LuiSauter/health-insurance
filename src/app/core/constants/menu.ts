import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Dashboard',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/home.svg',
          label: 'Dashboard',
          route: '/dashboard',
        },
      ],
    },
    {
      group: 'Administración',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Usuarios',
          route: '/usuarios',
          children: [
            {
              label: 'Usuarios',
              route: '/usuarios',
            },
            {
              label: 'Roles',
              route: '/usuarios/roles',
            },
          ]
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Clínica',
          route: '/clinica',
          children: [
            // {
            //   label: 'clínicas',
            //   route: '/clinica',
            // },
            {
              label: 'Médicos',
              route: '/clinica/medicos',
            },
            {
              label: 'Especialidades',
              route: '/clinica/especialidades',
            },
            {
              label: 'Pacientes',
              route: '/clinica/pacientes',
            }
          ]
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Consultas',
          route: '/consultas',
          children: [
            {
              label: 'Fichas',
              route: '/fichas',
            },
            {
              label: 'Citas',
              route: '/citas',
            },
            {
              label: 'Consultas',
              route: '/consultas',
            },
            {
              label: 'Recetas',
              route: '/recetas',
            },
            {
              label: 'Exámenes',
              route: '/examenes',
            }
          ]
        },
      ],
    },
    {
      group: 'Finanzas',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/currency-dollar.svg',
          label: 'Pagos',
          route: '/pagos',
          children: [
            {
              label: 'Transacciones',
              route: '/transacciones',
            },
            {
              label: 'Stripe Checkout',
              route: '/stripe-checkout',
            }
          ]
        }
      ]
    },
    // {
    //   group: 'Config',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/cog.svg',
    //       label: 'Settings',
    //       route: '/settings',
    //     }
    //   ],
    // },
  ];
}
