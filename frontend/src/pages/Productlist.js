import { React, useEffect, useState } from 'react';
import {Table} from "antd";
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import { deleteProduct, getProducts } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {AiOutlineFilePdf} from 'react-icons/ai';



const columns = [
    {
      title: 'Product ID.',
      dataIndex: 'productID',
      sorter: (a,b) => a.productID.length - b.productID.length,
      align: 'left'
    },
    {
      title: 'Serial NO.',
      dataIndex: 'SerialNo',
      sorter: (a,b) => a.SerialNo.length - b.SerialNo.length,
      align: 'left'
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      sorter: (a,b) => a.Title.length - b.Title.length,
      align: 'left'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'left'
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      align: 'left'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'left'
    }, 
    {
      title: 'Brand',
      dataIndex: 'brand',
      align: 'left'
    }, 
    {
      title: 'Color',
      dataIndex: 'color',
      align: 'left'
    }, 
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'left',
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    }, 
    {
      title: 'Tags',
      dataIndex: 'tags',
      align: 'left',
    }, 
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'left'
    }, 
  ];


const Productlist = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const showModal = (e) => {
    setOpen(true);
    setproductId(e)
  };
  const handleOk = (e) => {
    dispatch(deleteProduct(e));
    setOpen(false);
    setTimeout(()=>{ dispatch(getProducts()) }, 100)
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const data1 =[];

  for(let i = 0; i< productState.length ; i++){
    data1.push({
        key: i + 1,
        productID: productState[i].productID,
        SerialNo: productState[i].SerialNo,
        Title: productState[i].Title,
        price: productState[i].price,
        discount: productState[i].discount,
        category: productState[i].category,
        brand: productState[i].brand,
        color: productState[i].color,
        tags: productState[i].tags,
        description: productState[i].description,
        action: (
          <span className='d-flex'>
            <button className="fs-3 text-warning bg-transparent border-0" onClick={() => navigate(`/admin/UpdateProduct/${productState[i]._id}`)} >
            <BiEdit />
            </button>
            <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(productState[i]._id)}>
              <RiDeleteBin5Fill />
            </button>
          </span>
        ),
    })
  }
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const logoURL = '/images/CMLogo.png';
    doc.addImage(logoURL, 'PNG', 10, 10, 30, 20);
    
    doc.setFont('helvetica');
    doc.setFontSize(16);

    doc.text('...Products Report...', 70, 20);

    doc.setFontSize(10);

    const currentDate = new Date().toLocaleDateString();

    const address = `
    Chathura spare parts,
    Dambulla road,
    Ibbagamuwa
    (+94)91 2245891
    chathuraspares@gmail.com
  `;
    doc.text(address, 140, 8);

    doc.text(`Generated in: ${currentDate}`, 75, 30);

  
    const tableData = productState.map((product, index) => [
      product.productID,
      product.Title,
      product.category,
      product.color,
      product.tags,
      product.price,
      product.price - (product.price / 100 * product.discount),
      product.sold,
      product.price *  product.sold,
    ]);
  
    doc.autoTable({
      head: [
        ['Serial No', 'Title', 'Category', 'Color', 'Tags', 'Price in Rs.', 'Discounted price in Rs.', 'Sold Amount', 'Total Income in Rs.'],
      ],
      body: tableData,
      startY: 40,
    });
    
    doc.save('product_report.pdf');
  };
  
  const filteredData = data1.filter(
    (product) =>
      product.productID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stripHtmlTags(product.description).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className="title">Products...</h3>
      <div className='d-flex row'>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <input
              type='text'
              placeholder='Search by ProductID or Title'
              value={searchTerm}
              onChange={handleSearch}
              className='form-control'
              style={{ width: '600px', margin: '10px 10px' }}
            />
          <button className="bg-transparent border-0" onClick={generatePDF}>
          <h6 style={{ color: 'blue', margin: '0' }}>Generate Report:</h6> 
              <AiOutlineFilePdf style={{ height: '25px', width: '25px', color: 'blue' }}/> 
            
          </button>
        </div>
      </div>

      <div className='bg-white'>
        <Table columns={columns} dataSource={filteredData} />
      </div>
      <CustomModal hideModal={handleCancel} open={open} performAction={() => handleOk(productId)} title='Are you sure you want to delete this product.?' />
    </div>
  )
}

export default Productlist;