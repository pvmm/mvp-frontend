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
 * Função para criar um botão para abrir cada item da lista
 *--------------------------------------------------------------------------------------
 */
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("Abrir");
  span.className = "open";
  span.appendChild(txt);
  parent.appendChild(span);
}


const loadArticle = (title, body, author, date) => {
  let titleNode = document.getElementById("title");
  let bodyNode  = document.getElementById("body");
  let authorNode  = document.getElementById("author");
  let dateNode  = document.getElementById("date");
  console.log("XPTO!", bodyNode);
  console.log("XPTO!", bodyNode.text);

  titleNode.textContent = title;
  bodyNode.textContent = body;
  authorNode.textContent = author;
  dateNode.textContent = date;
}


/**
 *--------------------------------------------------------------------------------------
 * Função para carregar artigo do blog do servidor
 *--------------------------------------------------------------------------------------
 */
const readArticle = async (id) => {
  let url = 'http://127.0.0.1:5000/blog/' + id;
  fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Artigo carregado!", data);
      loadArticle(data.title, data.body, data.author, data.date);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/**
 *--------------------------------------------------------------------------------------
 * Função para criar botão de abrir um item da lista
 *--------------------------------------------------------------------------------------
 */
const openElement = () => {
  let actions = document.getElementsByClassName("open");

  for (let i = 0; i < actions.length; i++) {
    actions[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const id = div.getElementsByTagName('td')[0].innerHTML;
      readArticle(id);
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
const createItem = () => {
  let title = document.getElementById("input-title").value;
  let body = document.getElementById("input-body").value;
  let author = document.getElementById("input-author").value;
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
      .then((response) => response.json())
      .then((data) => insertTable(data.id, data.title, data.author, date))
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
  document.getElementById("input-title").value = "";
  document.getElementById("input-author").value = "";
  document.getElementById("input-body").value = "";

  openElement();
}

/**
 *--------------------------------------------------------------------------------------
 * Chamada da função para carregamento inicial dos dados
 *--------------------------------------------------------------------------------------
 */
window.onload = getList;

