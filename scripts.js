/**
 *--------------------------------------------------------------------------------------
 * Função para obter a lista existente do servidor via requisição GET
 *--------------------------------------------------------------------------------------
 */
const getList = async () => {
  let url = 'http://127.0.0.1:5000/posts';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      data.forEach(item => insertTable(item.id, item.title, item.author, item.date));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/**
 *--------------------------------------------------------------------------------------
 * Função para colocar um item na lista do servidor via requisição POST
 *--------------------------------------------------------------------------------------
 */
const postItem = async (title, body, author) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);
  formData.append('author', author);

  let url = 'http://127.0.0.1:5000/blog/add';
  return fetch(url, {
    method: 'post',
    body: formData
  });
}

/**
 *--------------------------------------------------------------------------------------
 * Função para criar um botão para remover cada item da lista
 *--------------------------------------------------------------------------------------
 */
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/**
 *--------------------------------------------------------------------------------------
 * Função para remover um item da lista de acordo com o click no botão de remover
 *--------------------------------------------------------------------------------------
 */
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  //let i = 0;
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/**
 *--------------------------------------------------------------------------------------
 * Função para deletar um item da lista do servidor via requisição DELETE
 *--------------------------------------------------------------------------------------
 */
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/blog/delete/' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/**
 *--------------------------------------------------------------------------------------
 * Função para adicionar um novo artigo de blog
 *--------------------------------------------------------------------------------------
 */
const newPost = () => {
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  let author = document.getElementById("author").value;
  let date = new Date().toString();

  if (title === '') {
    alert("Escreva o título do artigo!");
  } else if (body === '') {
    alert("Escreva o conteúdo do artigo!");
  } else if (author === '') {
    alert("Escreva o nome do autor do artigo!");
  } else {
    //insertTable(title, author, date)
    postItem(title, body, author)
      .then((data) => insertTable(data.id, data.title, data.author, data.date))
      .catch((error) => {
        console.error('Error:', error);
      });
    alert("Cliente adicionado!")
  }
}

/**
 *--------------------------------------------------------------------------------------
 * Função para inserir items na lista apresentada
 *--------------------------------------------------------------------------------------
 */
const insertTable = (id, title, author, date) => {
  var item = [id, title, author, date]
  var table = document.getElementById('BlogTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButton(row.insertCell(-1))
  document.getElementById("title").value = "";
  document.getElementById("body").value = "";
  document.getElementById("author").value = "";

  removeElement();
}

/**
 *--------------------------------------------------------------------------------------
 * Chamada da função para carregamento inicial dos dados
 *--------------------------------------------------------------------------------------
 */
window.onload = getList;

