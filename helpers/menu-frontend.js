const getMenuFrontEnd = (role='USER_ROLE') => {
    const menu = [
        {title:'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu:[
            {title:'Main',url:'/'},
            {title:'ProgressBar',url:"progress"},
            {title:'Graficas',url:"grafica1"},
            {title:'Promesas',url:"promesas"},
            {title:'RXJS',url:"rxjs"},
    
        ]},
        {title:'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu:[
            // {title:'Usuarios',url:'usuarios'},
            {title:'Hospitales',url:"hospitales"},
            {title:'Medicos',url:"medicos"},
    
        ]}
        
      ]
      if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({title:'Usuarios',url:'usuarios'})
      }

    return menu;
}
module.exports = {getMenuFrontEnd}